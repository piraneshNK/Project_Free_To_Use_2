grant usage on schema public to anon, authenticated;
revoke create on schema public from anon, authenticated;

revoke all privileges on table
  public.ai_tools,
  public.apis,
  public.llm_models,
  public.open_products,
  public.software
from anon, authenticated;

grant select on table
  public.ai_tools,
  public.apis,
  public.llm_models,
  public.open_products,
  public.software
to anon, authenticated;

alter table public.ai_tools enable row level security;
alter table public.apis enable row level security;
alter table public.llm_models enable row level security;
alter table public.open_products enable row level security;
alter table public.software enable row level security;

drop policy if exists public_directory_read on public.ai_tools;
create policy public_directory_read on public.ai_tools
  for select to anon, authenticated using (true);

drop policy if exists public_directory_read on public.apis;
create policy public_directory_read on public.apis
  for select to anon, authenticated using (true);

drop policy if exists public_directory_read on public.llm_models;
create policy public_directory_read on public.llm_models
  for select to anon, authenticated using (true);

drop policy if exists public_directory_read on public.open_products;
create policy public_directory_read on public.open_products
  for select to anon, authenticated using (true);

drop policy if exists public_directory_read on public.software;
create policy public_directory_read on public.software
  for select to anon, authenticated using (true);