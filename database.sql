-- CREATE DATABASE "minneplan"

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "site_coordinators" (
  "id" serial PRIMARY KEY,
  "user_ref" int,
  "coordinator_name" varchar,
  "coordinator_email" varchar
);

CREATE TABLE "sessions" (
  "id" serial PRIMARY KEY,
  "coordinator_ref" int,
  "season" varchar,
  "year" int,
  "is_archived" boolean,
  "is_being_planned" boolean
);

CREATE TABLE "instructors" (
  "id" serial PRIMARY KEY,
  "instructor_name" varchar,
  "instructor_email" varchar,
  "loginToken" varchar,
  "loginTokenExpiration" bigint,
  "loginTokenCreation" timestamp
);

CREATE TABLE "instructor_email_tracker" (
  "id" serial PRIMARY KEY,
  "instructor_ref" int,
  "coordinator_ref" int,
  "subject_line" varchar,
  "timestamp" timestamp
);

CREATE TABLE "coordinators_instructors" (
  "id" serial PRIMARY KEY,
  "coordinator_ref" int,
  "instructor_ref" int
);

CREATE TABLE "classes" (
  "id" serial PRIMARY KEY,
  "class_genre_ref" int,
  "session_ref" int,
  "instructor_ref" int,
  "class_name" varchar,
  "description" varchar(60),
  "start_date" date,
  "end_date" date,
  "day_of_week" int,
  "start_time" time,
  "end_time" time,
  "num_of_sessions" int,
  "student_cost" bigint,
  "instructor_pay" bigint,
  "materials_cost" bigint,
  "classroom_number" varchar,
  "building" varchar,
  "preparation_status" varchar,
  "preparation_message" varchar,
  "manual_preparation_status" varchar,
  "is_copied_to_official_schedule" boolean
);

CREATE TABLE "schedule_exceptions" (
  "id" serial PRIMARY KEY,
  "class_ref" int,
  "date_of_exception" date
);

CREATE TABLE "instructor_cost" (
  "id" serial PRIMARY KEY,
  "class_genre_ref" int,
  "salary_range_min" bigint,
  "salary_range_max" bigint,
  "class_fee_schedule" bigint,
  "approved_specialty_classes" varchar
);

CREATE TABLE "class_cost" (
  "id" serial PRIMARY KEY,
  "class_category_ref" int,
  "class_length" int,
  "class_frequency" int,
  "class_cost" bigint
);

CREATE TABLE "class_genres" (
  "id" serial PRIMARY KEY,
  "class_genre" varchar,
  "class_category_ref" int
);

CREATE TABLE "class_categories" (
  "id" serial PRIMARY KEY,
  "class_category" varchar
);

ALTER TABLE "classes" ADD FOREIGN KEY ("session_ref") REFERENCES "sessions" ("id");

ALTER TABLE "class_cost" ADD FOREIGN KEY ("class_category_ref") REFERENCES "class_categories" ("id");

ALTER TABLE "instructor_cost" ADD FOREIGN KEY ("class_genre_ref") REFERENCES "class_genres" ("id");

ALTER TABLE "class_genres" ADD FOREIGN KEY ("class_category_ref") REFERENCES "class_categories" ("id");

ALTER TABLE "schedule_exceptions" ADD FOREIGN KEY ("class_ref") REFERENCES "classes" ("id");

ALTER TABLE "classes" ADD FOREIGN KEY ("class_genre_ref") REFERENCES "class_genres" ("id");

ALTER TABLE "classes" ADD FOREIGN KEY ("instructor_ref") REFERENCES "instructors" ("id");

ALTER TABLE "site_coordinators" ADD FOREIGN KEY ("user_ref") REFERENCES "user" ("id");

ALTER TABLE "sessions" ADD FOREIGN KEY ("coordinator_ref") REFERENCES "site_coordinators" ("id");

ALTER TABLE "coordinators_instructors" ADD FOREIGN KEY ("coordinator_ref") REFERENCES "site_coordinators" ("id");

ALTER TABLE "coordinators_instructors" ADD FOREIGN KEY ("instructor_ref") REFERENCES "instructors" ("id");

ALTER TABLE "instructor_email_tracker" ADD FOREIGN KEY ("instructor_ref") REFERENCES "instructors" ("id");

ALTER TABLE "instructor_email_tracker" ADD FOREIGN KEY ("coordinator_ref") REFERENCES "site_coordinators" ("id");
