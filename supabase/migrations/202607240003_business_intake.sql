-- Mobile field-intake form, editable questions, submissions, and private media.

create table public.intake_form_fields (
  id uuid primary key default gen_random_uuid(),
  section_number integer not null check (section_number between 1 and 99),
  section_title text not null,
  field_order integer not null,
  field_key text not null unique,
  label text not null check (char_length(label) between 2 and 240),
  placeholder text not null default '',
  field_type text not null check (
    field_type in ('text', 'email', 'tel', 'url', 'textarea', 'radio', 'checkbox', 'time_range', 'file', 'number', 'date')
  ),
  options jsonb not null default '[]'::jsonb,
  required boolean not null default false,
  is_active boolean not null default true,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (section_number, field_order)
);

create table public.intake_submissions (
  id uuid primary key default gen_random_uuid(),
  display_name text not null default 'Nouvelle entreprise',
  status text not null default 'draft' check (status in ('draft', 'submitted')),
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz
);

create table public.intake_answers (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.intake_submissions(id) on delete cascade,
  field_id uuid not null references public.intake_form_fields(id),
  value jsonb not null default 'null'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (submission_id, field_id)
);

create table public.intake_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.intake_submissions(id) on delete cascade,
  field_id uuid not null references public.intake_form_fields(id),
  storage_path text not null unique,
  file_name text not null,
  mime_type text,
  file_size bigint not null check (file_size > 0 and file_size <= 10485760),
  uploaded_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create index intake_fields_order_idx on public.intake_form_fields(section_number, field_order);
create index intake_submissions_created_idx on public.intake_submissions(created_at desc);
create index intake_answers_submission_idx on public.intake_answers(submission_id);
create index intake_files_submission_idx on public.intake_files(submission_id);

create trigger intake_fields_updated_at before update on public.intake_form_fields
for each row execute function public.set_updated_at();
create trigger intake_submissions_updated_at before update on public.intake_submissions
for each row execute function public.set_updated_at();
create trigger intake_answers_updated_at before update on public.intake_answers
for each row execute function public.set_updated_at();

alter table public.intake_form_fields enable row level security;
alter table public.intake_submissions enable row level security;
alter table public.intake_answers enable row level security;
alter table public.intake_files enable row level security;

create policy "Admins manage intake fields"
on public.intake_form_fields for all
to authenticated
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "Admins manage intake submissions"
on public.intake_submissions for all
to authenticated
using (public.current_user_role() = 'admin')
with check (
  public.current_user_role() = 'admin'
  and created_by = auth.uid()
);

create policy "Admins manage intake answers"
on public.intake_answers for all
to authenticated
using (
  public.current_user_role() = 'admin'
  and exists (
    select 1 from public.intake_submissions
    where id = submission_id and created_by = auth.uid()
  )
)
with check (
  public.current_user_role() = 'admin'
  and exists (
    select 1 from public.intake_submissions
    where id = submission_id and created_by = auth.uid()
  )
);

create policy "Admins manage intake file records"
on public.intake_files for all
to authenticated
using (
  public.current_user_role() = 'admin'
  and uploaded_by = auth.uid()
)
with check (
  public.current_user_role() = 'admin'
  and uploaded_by = auth.uid()
);

grant select, insert, update, delete on public.intake_form_fields to authenticated;
grant select, insert, update, delete on public.intake_submissions to authenticated;
grant select, insert, update, delete on public.intake_answers to authenticated;
grant select, insert, update, delete on public.intake_files to authenticated;

insert into storage.buckets (id, name, public, file_size_limit)
values ('business-intake', 'business-intake', false, 10485760)
on conflict (id) do update
set public = false, file_size_limit = 10485760;

create policy "Admins upload intake files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'business-intake'
  and public.current_user_role() = 'admin'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Admins read intake files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'business-intake'
  and public.current_user_role() = 'admin'
  and owner_id = auth.uid()::text
);

create policy "Admins delete intake files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'business-intake'
  and public.current_user_role() = 'admin'
  and owner_id = auth.uid()::text
);

insert into public.intake_form_fields
  (section_number, section_title, field_order, field_key, label, placeholder, field_type, options, required, config)
values
  (1, 'Informations sur l''entreprise', 10, 'business_name', 'Nom du commerce', 'Nom de votre établissement', 'text', '[]', true, '{}'),
  (1, 'Informations sur l''entreprise', 20, 'business_category', 'Catégorie du commerce', 'Ex : Restaurant, Coiffeur…', 'text', '[]', true, '{}'),
  (1, 'Informations sur l''entreprise', 30, 'manager_name', 'Nom et prénom du responsable', 'Nom complet', 'text', '[]', true, '{}'),
  (1, 'Informations sur l''entreprise', 40, 'phone', 'Téléphone', 'Numéro de téléphone', 'tel', '[]', true, '{}'),
  (1, 'Informations sur l''entreprise', 50, 'whatsapp', 'WhatsApp', 'Numéro WhatsApp', 'tel', '[]', false, '{}'),
  (1, 'Informations sur l''entreprise', 60, 'professional_email', 'Adresse e-mail professionnelle', 'votre@email.com', 'email', '[]', true, '{}'),
  (1, 'Informations sur l''entreprise', 70, 'professional_email_access', 'Avez-vous accès à cette adresse e-mail ?', '', 'radio', '["Oui","Non"]', true, '{}'),
  (1, 'Informations sur l''entreprise', 80, 'business_address', 'Adresse du commerce', 'Adresse complète', 'textarea', '[]', true, '{}'),

  (2, 'Réseaux sociaux', 10, 'instagram', 'Instagram', 'Lien vers profil Instagram', 'url', '[]', false, '{}'),
  (2, 'Réseaux sociaux', 20, 'facebook', 'Facebook', 'Lien vers page Facebook', 'url', '[]', false, '{}'),
  (2, 'Réseaux sociaux', 30, 'tiktok', 'TikTok', 'Lien vers compte TikTok', 'url', '[]', false, '{}'),
  (2, 'Réseaux sociaux', 40, 'tripadvisor', 'TripAdvisor', 'Lien vers profil TripAdvisor', 'url', '[]', false, '{}'),

  (3, 'Fiche Google Business', 10, 'google_business_exists', 'Votre établissement possède-t-il déjà une fiche Google Business ?', '', 'radio', '["Oui","Non","Je ne sais pas"]', true, '{}'),
  (3, 'Fiche Google Business', 20, 'google_maps_url', 'Lien Google Maps', 'Lien Google Maps', 'url', '[]', false, '{}'),
  (3, 'Fiche Google Business', 30, 'google_business_email', 'Adresse e-mail utilisée pour gérer la fiche', 'votre@email.com', 'email', '[]', false, '{}'),
  (3, 'Fiche Google Business', 40, 'google_business_email_access', 'Avez-vous accès à cette adresse e-mail ?', '', 'radio', '["Oui","Non"]', true, '{}'),

  (4, 'Présentation de l''entreprise', 10, 'activity_description', 'Décrivez votre activité.', 'Description de l''activité', 'textarea', '[]', true, '{}'),
  (4, 'Présentation de l''entreprise', 20, 'differentiation', 'Qu''est-ce qui vous différencie de vos concurrents ?', 'Votre valeur unique', 'textarea', '[]', false, '{}'),
  (4, 'Présentation de l''entreprise', 30, 'spoken_languages', 'Langues parlées', '', 'checkbox', '["Arabe","Français","Anglais","Allemand","Italien","Autre"]', true, '{}'),
  (4, 'Présentation de l''entreprise', 40, 'payment_methods', 'Moyens de paiement acceptés', '', 'checkbox', '["Espèces","Carte bancaire","Virement bancaire","Paiement mobile"]', true, '{}'),
  (4, 'Présentation de l''entreprise', 50, 'parking_available', 'Parking disponible ?', '', 'radio', '["Oui","Non"]', true, '{}'),
  (4, 'Présentation de l''entreprise', 60, 'wifi_available', 'Wi-Fi disponible ?', '', 'radio', '["Oui","Non"]', true, '{}'),

  (5, 'Horaires d''ouverture', 10, 'hours_monday', 'Lundi', '08:00 - 18:00', 'time_range', '[]', false, '{"defaultStart":"08:00","defaultEnd":"18:00"}'),
  (5, 'Horaires d''ouverture', 20, 'hours_tuesday', 'Mardi', '08:00 - 18:00', 'time_range', '[]', false, '{"defaultStart":"08:00","defaultEnd":"18:00"}'),
  (5, 'Horaires d''ouverture', 30, 'hours_wednesday', 'Mercredi', '08:00 - 18:00', 'time_range', '[]', false, '{"defaultStart":"08:00","defaultEnd":"18:00"}'),
  (5, 'Horaires d''ouverture', 40, 'hours_thursday', 'Jeudi', '08:00 - 18:00', 'time_range', '[]', false, '{"defaultStart":"08:00","defaultEnd":"18:00"}'),
  (5, 'Horaires d''ouverture', 50, 'hours_friday', 'Vendredi', '08:00 - 18:00', 'time_range', '[]', false, '{"defaultStart":"08:00","defaultEnd":"18:00"}'),
  (5, 'Horaires d''ouverture', 60, 'hours_saturday', 'Samedi', '08:00 - 18:00', 'time_range', '[]', false, '{"defaultStart":"08:00","defaultEnd":"18:00"}'),
  (5, 'Horaires d''ouverture', 70, 'hours_sunday', 'Dimanche', '08:00 - 18:00', 'time_range', '[]', false, '{"defaultStart":"08:00","defaultEnd":"18:00"}'),

  (6, 'Identité visuelle', 10, 'desired_style', 'Style souhaité', '', 'radio', '["Moderne","Premium","Minimaliste","Traditionnel","Élégant","Familial"]', true, '{}'),
  (6, 'Identité visuelle', 20, 'preferred_colors', 'Couleurs préférées', 'Couleurs', 'text', '[]', false, '{}'),
  (6, 'Identité visuelle', 30, 'slogan', 'Slogan', 'Slogan', 'text', '[]', false, '{}'),

  (7, 'Médias', 10, 'logo_upload', 'Téléverser le logo', 'PNG, JPG ou fichier vectoriel', 'file', '[]', true, '{"multiple":false,"accept":"image/*,.svg"}'),
  (7, 'Médias', 20, 'establishment_photos', 'Téléverser plusieurs photos de l''établissement', 'Taille maximale : 10 Mo par fichier', 'file', '[]', true, '{"multiple":true,"accept":"image/*"}'),
  (7, 'Médias', 30, 'product_photos', 'Téléverser plusieurs photos des produits', 'Taille maximale : 10 Mo par fichier', 'file', '[]', true, '{"multiple":true,"accept":"image/*"}'),
  (7, 'Médias', 40, 'menu_photos', 'Téléverser plusieurs photos du menu', 'Taille maximale : 10 Mo par fichier', 'file', '[]', true, '{"multiple":true,"accept":"image/*,.pdf"}'),
  (7, 'Médias', 50, 'videos', 'Téléverser plusieurs vidéos', 'Taille maximale : 10 Mo par fichier', 'file', '[]', true, '{"multiple":true,"accept":"video/*"}'),
  (7, 'Médias', 60, 'other_files', 'Téléverser d''autres fichiers utiles', 'Taille maximale : 10 Mo par fichier', 'file', '[]', true, '{"multiple":true,"accept":"*/*"}'),

  (8, 'Accès', 10, 'available_access', 'Quels accès pouvez-vous nous fournir ?', '', 'checkbox', '["Google Business Profile","Nom de domaine","Hébergement","Page Facebook","Compte Instagram","Autre"]', true, '{}'),
  (8, 'Accès', 20, 'preferred_contact', 'Quel est votre moyen de contact préféré ?', '', 'radio', '["WhatsApp","Appel téléphonique","E-mail"]', true, '{}'),
  (8, 'Accès', 30, 'contact_availability', 'À quels jours et horaires êtes-vous généralement disponible pour être contacté ?', 'Jours / heures', 'textarea', '[]', false, '{}'),

  (9, 'Interne ScaleUnities', 10, 'salesperson', 'Commercial', 'Nom commercial', 'text', '[]', false, '{}'),
  (9, 'Interne ScaleUnities', 20, 'offer_sold', 'Offre vendue', '', 'radio', '["Digital Start Essential","Digital Start Plus","Business Growth","Business Growth Pro","Enterprise","Enterprise Pro"]', true, '{}'),
  (9, 'Interne ScaleUnities', 30, 'monthly_subscription', 'Abonnement mensuel', 'Montant', 'number', '[]', false, '{"suffix":"TND"}'),
  (9, 'Interne ScaleUnities', 40, 'setup_fee', 'Frais d''installation', 'Montant', 'number', '[]', false, '{"suffix":"TND"}'),
  (9, 'Interne ScaleUnities', 50, 'followup_date', 'Date de relance', 'Date', 'date', '[]', false, '{}'),
  (9, 'Interne ScaleUnities', 60, 'assigned_developer', 'Développeur assigné', 'Nom développeur', 'text', '[]', false, '{}'),
  (9, 'Interne ScaleUnities', 70, 'assigned_google_specialist', 'Spécialiste Google Business assigné', 'Nom spécialiste', 'text', '[]', false, '{}'),
  (9, 'Interne ScaleUnities', 80, 'internal_notes', 'Notes internes', 'Notes', 'textarea', '[]', false, '{}')
on conflict (field_key) do nothing;
