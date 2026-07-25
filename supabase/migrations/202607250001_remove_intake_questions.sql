-- Remove the requested questions from the active field-intake form.
-- Existing answers remain available in historical submissions.

update public.intake_form_fields
set is_active = false
where field_key in (
  'differentiation',
  'spoken_languages',
  'hours_monday',
  'preferred_colors',
  'establishment_photos',
  'product_photos',
  'videos',
  'other_files',
  'available_access',
  'salesperson',
  'monthly_subscription',
  'setup_fee'
);
