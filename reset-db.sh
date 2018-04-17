#!/bin/sh

psql -U proxyuser -p 3399 -h 127.0.0.1 jeffrey << EOF
DROP TABLE IF EXISTS
 access_tokens,
 apple_ios_receipts,
 businesses,
 conversation_participants,
 conversations,
 countries,
 invoice_items,
 invoices,
 knex_migrations,
 knex_migrations_lock,
 login_tokens,
 messages,
 pending_users,
 phone_number_verifications,
 postal_addresses,
 product_prices,
 products,
 reset_password_tokens,
 reviews,
 service_categories,
 services,
 stripe_cards,
 tos_acceptances,
 user_devices,
 user_documents,
 users
CASCADE;
EOF
