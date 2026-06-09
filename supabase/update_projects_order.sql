-- Run this in the Supabase SQL Editor to add explicit ordering to projects
-- Fixed syntax error: removed double 'if'

alter table projects add column if not exists order_index integer default 0;

-- Update existing projects with an initial order (optional)
update projects set order_index = 1 where slug = 'gan-model-from-scratch';
update projects set order_index = 2 where slug = 'live-mart';
update projects set order_index = 3 where slug = 'molte-personal-chatbot';
update projects set order_index = 4 where slug = 'squirl';
update projects set order_index = 5 where slug = 'repo-profiler';
