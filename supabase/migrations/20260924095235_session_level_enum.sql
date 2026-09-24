-- Every session gets a level, so attendees can pick talks that match their
-- experience. Like `track`, it is an enum: the allowed values live in the
-- schema, and `pnpm db:types` generates a union type for them.

-- Postgres has no `create type if not exists`, so check the catalog first.
do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'session_level'
      and typnamespace = 'public'::regnamespace
  ) then
    create type public.session_level as enum (
      'beginner',
      'intermediate',
      'advanced'
    );
  end if;
end $$;

-- Added as nullable first, so the existing rows can be filled in before the
-- not-null constraint applies.
alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions
set level = case id
  when 'opening-keynote' then 'beginner'
  when 'build-your-agentic-workflow' then 'intermediate'
  when 'server-components-deep-dive' then 'advanced'
  when 'rsc-payload-budget' then 'advanced'
  when 'agent-context-windows' then 'intermediate'
  when 'micro-frontends-2026' then 'intermediate'
  when 'testing-ai-generated-code' then 'intermediate'
  when 'closing-panel' then 'beginner'
end::public.session_level
where level is null;

-- Fails loudly if a row was missed above, instead of leaving it empty.
alter table public.sessions
  alter column level set not null;
