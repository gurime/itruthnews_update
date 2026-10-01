import { cookies } from 'next/headers';
import { createClient } from '../../../utils/supabase/server';

type NewsletterPreferences = {
freeBriefing: boolean;
premiumBriefing: boolean;
};

async function getAccount() {
const supabase = createClient(await cookies());
const { data: { user }, error: userError } = await supabase.auth.getUser();

if (userError || !user) {
return { response: Response.json({ error: 'Sign in to manage email preferences.' }, { status: 401 }) };
}

const { data: profile, error: profileError } = await supabase
.from('profiles')
.select('subscription_status, role')
.eq('id', user.id)
.maybeSingle();

if (profileError || !profile) {
return { response: Response.json({ error: 'Could not verify your membership.' }, { status: 503 }) };
}

return {
supabase,
user,
isPremium: profile.subscription_status !== 'free' || profile.role === 'admin',
};
}

export async function GET() {
const account = await getAccount();
if ('response' in account) return account.response;

const { data: preferences, error } = await account.supabase
.from('newsletter_preferences')
.select('free_briefing, premium_briefing')
.eq('user_id', account.user.id)
.maybeSingle();

if (error) {
return Response.json({ error: 'Email preferences are not configured yet. Apply the newsletter preferences migration.' }, { status: 503 });
}

const premiumBriefing = account.isPremium && !!preferences?.premium_briefing;

if (!account.isPremium && preferences?.premium_briefing) {
await account.supabase
.from('newsletter_preferences')
.update({ premium_briefing: false })
.eq('user_id', account.user.id);
}

return Response.json({
freeBriefing: !!preferences?.free_briefing,
premiumBriefing,
} satisfies NewsletterPreferences);
}

export async function PATCH(request: Request) {
let payload: unknown;

try {
payload = await request.json();
} catch {
return Response.json({ error: 'Invalid request.' }, { status: 400 });
}

if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
return Response.json({ error: 'Invalid request.' }, { status: 400 });
}

const { freeBriefing, premiumBriefing } = payload as Partial<NewsletterPreferences>;
if (typeof freeBriefing !== 'boolean' || typeof premiumBriefing !== 'boolean') {
return Response.json({ error: 'Choose valid email preferences.' }, { status: 400 });
}

const account = await getAccount();
if ('response' in account) return account.response;

if (premiumBriefing && !account.isPremium) {
return Response.json({ error: 'Premium briefings are available to Premium members.' }, { status: 403 });
}

const { error } = await account.supabase
.from('newsletter_preferences')
.upsert({
user_id: account.user.id,
free_briefing: freeBriefing,
premium_briefing: premiumBriefing,
updated_at: new Date().toISOString(),
}, { onConflict: 'user_id' });

if (error) {
return Response.json({ error: 'Could not save email preferences. Apply the newsletter preferences migration and try again.' }, { status: 503 });
}

return Response.json({ freeBriefing, premiumBriefing } satisfies NewsletterPreferences);
}