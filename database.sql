-- CREATE DATABASE "minneplan"

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "site_coordinators" (
  "id" SERIAL PRIMARY KEY,
  "user_ref" INT REFERENCES "user",
  "coordinator_name" VARCHAR (80),
  "coordinator_email" VARCHAR (80)
);

CREATE TABLE "seasons" (
  "id" SERIAL PRIMARY KEY,
  "season" VARCHAR(25)
);

CREATE TABLE "years" (
  "id" SERIAL PRIMARY KEY,
  "years" integer
);

CREATE TABLE "sessions" (
  "id" SERIAL PRIMARY KEY,
  "coordinator_ref" INT REFERENCES "site_coordinators",
  "season" INT REFERENCES "seasons",
  "year" INT REFERENCES "years",
  "session_status" varchar
);

CREATE TABLE "instructors" (
  "id" SERIAL PRIMARY KEY,
  "instructor_name" varchar,
  "instructor_email" varchar UNIQUE,
  "phone_number" varchar
);

CREATE TABLE "instructor_email_tracker" (
  "id" SERIAL PRIMARY KEY,
  "instructor_ref" INT REFERENCES "instructors",
  "coordinator_ref" INT REFERENCES "site_coordinators",
  "subject_line" varchar,
  "timestamp" time
);

CREATE TABLE "coordinators_instructors" (
  "id" SERIAL PRIMARY KEY,
   "instructor_ref" INT REFERENCES "instructors",
  "coordinator_ref" INT REFERENCES "site_coordinators"
);

CREATE TABLE "classes" (
  "id" SERIAL PRIMARY KEY,
  "session_ref" INT REFERENCES "sessions",
  "instructor_ref" INT REFERENCES "instructors",
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

