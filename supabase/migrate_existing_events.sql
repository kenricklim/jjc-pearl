-- Migration script to add existing events to the database
-- Run this after creating the events table
-- Note: Replace 'YOUR_ADMIN_USER_ID' with an actual admin user_id from the profiles table

-- First, get an admin user_id (run this query first to find an admin):
-- SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1;

-- Then replace 'YOUR_ADMIN_USER_ID' below with the actual UUID

INSERT INTO public.events (title, description, status, date, images, created_by)
VALUES
  (
    'PJJCI Old Guards Gala Night and 2nd Induction and Turnover Ceremonies JJC PP Perlas',
    'Gala night celebrating PJJCI Old Guards and the 2nd induction and turnover ceremonies of JJC PP Perlas',
    'completed',
    'January 10, 2026',
    ARRAY['/Events picture/Jan 10, 2026 _ PJJCI OLD GUARDS GALA NIGHT AND 2nd INDUCTION AND TURNOVER Ceremonies JJC PP PERLAS.png'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'PJJCI Old Guards City Tour in PPC, Palawan',
    'City tour for PJJCI Old Guards exploring Puerto Princesa City, Palawan',
    'completed',
    'January 10, 2026',
    ARRAY['/Events picture/Jan 10, 2026_ PJJCI OLD GUARDS CITY TOUR IN PPC, PALAWAN.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'PJJCI Old Guards and JJC PP Perlas Dinner Night',
    'Dinner night bringing together PJJCI Old Guards and JJC PP Perlas members',
    'completed',
    'January 9, 2026',
    ARRAY['/Events picture/Jan 9, 2026 _ PJJCI OLD GUARDS AND JJC PP PERLAS DINNER NIGHT.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Project Lingap - CSWD Group Home for Children, Brgy. Mangingisda, PPC',
    'Community service project at CSWD Group Home for Children in Brgy. Mangingisda, Puerto Princesa City',
    'completed',
    'January 9, 2026',
    ARRAY['/Events picture/Jan 9, 2026 _ Project Lingap ( CSWD GROUP HOME FOR CHILDREN, Brgy. Mangingisda, PPC)_.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Oplan Kaagapay - Tulong para sa mga Palaweno Apektado ng Bagyong Tino',
    'Relief operation for Palawenos affected by Typhoon Tino',
    'completed',
    'November 9, 2025',
    ARRAY['/Events picture/Nov 9, 2025 _ Oplan Kaagapay_ Tulong para sa mga Palaweno apektado ng bagyong Tino.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'UNSDG 17 Goals Unlocked - Session 2',
    'Session 2 of the UNSDG 17 Goals Unlocked program',
    'completed',
    'November 2, 2025',
    ARRAY['/Events picture/Nov 2, 2025_ UNSDG 17 Goals unlocked_ Session 2.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Halloween Party - Fundraising Event',
    'Halloween party fundraising event for community causes',
    'completed',
    'October 31, 2025',
    ARRAY['/Events picture/Oct 31, 2025 _ Halloween Party_ Fundraising event.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Parliamentary Procedure and Project Planning Seminar',
    'Educational seminar on parliamentary procedure and effective project planning',
    'completed',
    'October 25, 2025',
    ARRAY['/Events picture/Oct 25, 2025 _ Parliamentary Procedure and Project Planning Seminar.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'World Cleanup Day',
    'Participating in World Cleanup Day - a global movement to clean up the planet',
    'completed',
    'September 20, 2025',
    ARRAY['/Events picture/Sept 20, 2025 _ World Cleanup Day.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Teachers Day - Fundraising Event',
    'Fundraising event celebrating Teachers Day',
    'completed',
    'September 26, 2025',
    ARRAY['/Events picture/Sept 26, 2025 _Teachers day_ Fundraising Event.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Opportunity to Impact and General Membership Meeting',
    'General membership meeting and opportunity to impact event',
    'completed',
    'September 7, 2025',
    ARRAY['/Events picture/Sept 7,  2025_ opportunityto impact and general membershipmeeting.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Membership Seminar',
    'Educational seminar for new and prospective members',
    'completed',
    'July 5, 2025',
    ARRAY['/Events picture/July 5, 2025 _ Membership Seminar.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'JJC PP Perlas 1st Induction and Turnover Ceremonies',
    'First induction and turnover ceremonies of JJC PP Perlas',
    'completed',
    'February 17, 2025',
    ARRAY['/Events picture/Feb 17, 2025 _ JJC PP PERLAS 1st Induction and Turnover Ceremonies.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Dinner for a Cause',
    'Fundraising dinner event for community causes',
    'completed',
    'February 14, 2025',
    ARRAY['/Events picture/Feb 14, 2025_ dinner for a cause.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'General Membership Meeting and Opportunity to Impact',
    'General membership meeting and opportunity to impact event for members',
    'completed',
    'February 3, 2025',
    ARRAY['/Events picture/Feb 3, 2025 _ General Membership Meeting and Opportunity to Impact.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Wellness Behind the Wall - Hygiene, Education and Recreation for Women Deprived of Liberty',
    'Program providing hygiene, education, and recreation for women deprived of liberty',
    'completed',
    'January 29, 2025',
    ARRAY['/Events picture/Jan 29, 2025_ Wellness Behind the Wall_ Hygiene, Education and Recreation for women deprived of liberty.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Pasko na Sinta Kiao - Christmas Lantern for a Cause Year 3',
    'Annual Christmas lantern fundraising event - Year 3',
    'completed',
    'November 7, 2024',
    ARRAY['/Events picture/Nov 7, 2024 _ Pasko na Sinta Kiao_ Christmas Lantern for a Cause Year 3_.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Membership Seminar',
    'Educational seminar for new and prospective members',
    'completed',
    'September 15, 2024',
    ARRAY['/Events picture/Sept 15, 2024 _ Membership Seminar.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Kabataan for Health',
    'Youth health awareness and wellness program at Group Homes for Children, Brgy. Mangingisda, PPC',
    'completed',
    'April 14, 2024',
    ARRAY['/Events picture/April 14, 2024 _ Kabataan for Health ( Group Homes for Children, Brgy. Mangingisda, Ppc)_.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Outreach Initiative at Brgy. Conception, PPC (BATAK COMMUNITY)',
    'Community outreach and support initiative for the Batak community in Brgy. Conception, Puerto Princesa City',
    'completed',
    'March 19, 2024',
    ARRAY['/Events picture/March 19, 2024 _Outreach Initiative at Brgy. Conception, PPC ( BATAK COMMUNITY)_.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Halloween Party for a Cause',
    'Community Halloween celebration with a purpose - bringing joy and support to the community',
    'completed',
    'October 30, 2023',
    ARRAY['/Events picture/October 30, 2023 Halloween party for a cause_.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'JCI Protocols and Project Planning Workshop',
    'Training workshop on JCI protocols and effective project planning for members',
    'completed',
    'October 7, 2023',
    ARRAY['/Events picture/October 7, 2023 JCI PROTOCOLS AND PROJECT PLANINGWORKSHOP_.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    '1st General Membership Meeting and 2nd Opportunity to Impact',
    'General membership meeting and opportunity to impact event for new and existing members',
    'completed',
    '2023',
    ARRAY['/Events picture/2023 1st General Membership Meeting and 2nd OpportunityTo impact.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  ),
  (
    'Cake Tagal Kitang Hinihintay - Cake Raffle Year 6',
    'Annual cake raffle fundraising event - Year 6 of this beloved community tradition',
    'completed',
    'February 5, 2023',
    ARRAY['/Events picture/feb 05, 2023 _ Cake Tagal Kitang Hinihintay_ Cake Raffle Year 6_.jpg'],
    (SELECT user_id FROM profiles WHERE role = 'admin' LIMIT 1)
  )
ON CONFLICT DO NOTHING;
