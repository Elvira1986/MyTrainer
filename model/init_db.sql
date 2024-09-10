--
-- Drop Tables
--

DROP TABLE if exists users;
DROP TABLE if exists exercises;
DROP TABLE if exists favorite_exercises;
DROP TABLE if exists favorite_food;

--
-- Create Tables
--

CREATE TABLE `favorite_exercises`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `users_id` INT NOT NULL,
    `exercises_id` INT NOT NULL
   
);

CREATE TABLE `favorite_food`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `users_id` INT NOT NULL,
    `external_api_id` VARCHAR(5000) NOT NULL,
    `name` VARCHAR(1000),
    `image` VARCHAR(5000) 
);

CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255),
    `last_name` VARCHAR(255),
    `height` INT,
    `weight` INT,
    `gender` VARCHAR(255),
    `goal` VARCHAR(255)
);

CREATE TABLE `exercises`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    `description` VARCHAR(5000),
    `goal` VARCHAR(255),
    `muscles` VARCHAR(255),
    `category` VARCHAR(255),
    `image` VARCHAR(255),
    `equipment` VARCHAR(255) 
);

INSERT INTO exercises ( name, description, goal, muscles, category, image, equipment) VALUES 
('Crunch', 'Lie on your back on the floor with your knees bent. Curl your shoulders towards your pelvis. Hands can be behind or beside the neck or crossed over the chest. Repeat.', 'Get fit', 'Pectoralis major', 'olympic weightlifting', 'https://wger.de/media/exercise-images/91/Crunches-1.png', 'Gym mat'), 
('Abdominal Crunch', 'Sit on a mat, with your calves resting on a bench, and your knees forming a right angle. Keep your hands behind your neck. Now roll your back up, feeling how the individual vertebrae lose contact with the mat. At the highest point, contract your abs as much as you can and hold for 2 seconds. Lower yourself down, unrolling your back.', 'Increase strength', 'Pectoralis major, Hamstrings', 'stretching', 'https://wger.de/media/exercise-images/93/Decline-crunch-1.png', 'Body weight, gym mat'), 
('Hyperextensions', 'A hyperextension is an effective exercise for working out the lower back. Start by lying face down on a hyperextension bench. Then, slowly lower your upper body towards the ground and return to the starting position.', 'Increase strength', 'Lats', 'powerlifting', 'https://wger.de/media/exercise-images/128/Hyperextensions-1.png', 'Barbell, gym mat'),
('Narrow Grip Bench Press', 'The narrow grip bench press is a great exercise for targeting the triceps and chest muscles. Lie flat on a bench and grip the barbell with your hands shoulder-width apart. Lower the barbell to your chest and then press it back up to the starting position.', 'Increase strength', 'Triceps', 'stretching', 'https://wger.de/media/exercise-images/88/Narrow-grip-bench-press-1.png', 'Incline bench'),
('Standing Bicep Curl', 'Standing with feet shoulder-width apart and a dumbbell in each hand, curl the weights up towards your shoulders, keeping your elbows close to your torso.', 'Gain weight', 'Quads', 'olympic weightlifting', 'https://wger.de/media/exercise-images/129/Standing-biceps-curl-1.png', 'Dumbbell'),
('Alternating Bicep Curls', 'Starting position: Begin standing with dumbbells in each hand, back straight, and feet hip-width apart. Arms are relaxed and pointing down. Knees should be slightly bent, abs engaged, and shoulders down. Steps: 1. Bend one arm at the elbow and bring the dumbbell up to your shoulder. Your upper arm should remain still during this movement. 2. Lower the dumbbell back down until your arm is in its original relaxed position. 3. Repeat with the other arm.', 'Get fit', 'Biceps', 'strongman', 'https://wger.de/media/exercise-images/81/Biceps-curl-1.png', 'Dumbbell, barbell'),
('Good Mornings', 'Good Mornings are a great exercise for strengthening the lower back, glutes, and hamstrings. Stand with feet shoulder-width apart, hold a barbell across your upper back, and bend at the hips until your torso is almost parallel to the floor. Return to the starting position.', 'Increase strength', 'Glutes', 'olympic weightlifting', 'https://wger.de/media/exercise-images/74/Bicep-curls-1.png', 'Dumbbell'), 
('Bench Dips', 'Bench Dips are an effective exercise for targeting the triceps. Place your hands on the edge of a bench behind you, extend your legs forward, and lower your body by bending your elbows until your arms form a 90-degree angle. Push yourself back up to the starting position.', 'Get fit', 'Triceps', 'strongman', 'https://wger.de/media/exercise-images/83/Bench-dips-1.png', 'Barbell'),
('Dumbbell Shrugs', 'Dumbbell Shrugs are great for strengthening the trapezius muscles. Stand with feet shoulder-width apart, holding a dumbbell in each hand. Lift your shoulders towards your ears and hold for a second before lowering them back down.', 'Gain weight', 'Trapezius', 'strongman', 'https://wger.de/media/exercise-images/151/Dumbbell-shrugs-2.png', 'Dumbbell'), 
('Barbell Shrugs', 'Barbell Shrugs are an effective exercise for developing the trapezius muscles. Stand with your feet shoulder-width apart, hold a barbell in front of you, and shrug your shoulders upwards towards your ears.', 'Increase strength', 'Triceps', 'stretching', 'https://wger.de/media/exercise-images/150/Barbell-shrugs-1.png', 'Barbell, body weight'), 
('Bicep Hammer Curl', 'Bicep Hammer Curls are excellent for building the biceps. Stand with feet shoulder-width apart, holding a dumbbell in each hand with a neutral grip. Curl the weights up towards your shoulders while keeping your elbows close to your torso.', 'Get fit', 'Pectoralis major, chest', 'stretching', 'https://wger.de/media/exercise-images/86/Bicep-hammer-curl-1.png', 'Body weight'), 
('Hammer Curls with Rope', 'Hammer Curls with Rope are an excellent exercise for targeting the biceps. Stand with your feet shoulder-width apart, holding a rope attached to a low pulley. Curl the rope towards your shoulders, keeping your elbows close to your torso.', 'Get fit', 'Quads', 'olympic weightlifting', 'https://wger.de/media/exercise-images/138/Hammer-curls-with-rope-1.png', 'Rope'), 
('Push-Ups', 'Push-Ups are a classic bodyweight exercise that targets the chest, shoulders, and triceps. Start in a plank position with your hands slightly wider than shoulder-width apart. Lower your body until your chest nearly touches the floor, then push yourself back up to the starting position.', 'Loose weight', 'Chest', 'plyometrics', 'https://wger.de/media/exercise-images/195/Push-ups-1.png', 'Barbell, gym mat'), 
('Lying Close Grip Triceps Press to Chin', 'This exercise targets the triceps and chest. Lie on a bench with a barbell and grip it with your hands close together. Lower the bar towards your chin, keeping your elbows close to your body, then press it back up.', 'Increase strength', 'Triceps', 'stretching', 'https://wger.de/media/exercise-images/84/Lying-close-grip-triceps-press-to-chin-1.png', 'Body weight, gym mat'), 
('Decline Close Grip Bench Press', 'This exercise is great for targeting the triceps and lower chest. Lie on a decline bench and grip the barbell with your hands shoulder-width apart. Lower the bar to your chest, then press it back up.', 'Loose weight', 'Lats', 'plyometrics', 'https://wger.de/media/exercise-images/88/Narrow-grip-bench-press-1.png', 'Incline bench'), 
('Lying Leg Curl', 'Lie face down on a leg curl machine, placing your ankles under the padded lever. Curl your legs up towards your glutes, contracting your hamstrings. Lower them back down slowly.', 'Increase strength', 'Hamstrings', 'strongman', 'https://wger.de/media/exercise-images/128/Hyperextensions-1.png', 'Gym mat'), 
('Seated Leg Press', 'Sit on a leg press machine with your feet on the platform. Push the platform away from you by extending your legs, then return to the starting position.', 'Gain weight', 'Quads', 'olympic weightlifting', 'https://wger.de/media/exercise-images/81/Biceps-curl-1.png', 'Barbell'), 
('Incline Dumbbell Press', 'Lie on an incline bench with a dumbbell in each hand. Press the dumbbells upward until your arms are fully extended, then lower them back down slowly.', 'Loose weight', 'Chest, pectoralis major', 'plyometrics', 'https://wger.de/media/exercise-images/195/Push-ups-1.png', 'Dumbbell'), 
('Cable Tricep Pushdown', 'Stand in front of a cable machine with a rope attachment. Hold the rope with both hands, palms facing each other. Push the rope down by extending your elbows, then slowly return to the starting position.', 'Increase strength', 'Triceps', 'stretching', 'https://wger.de/media/exercise-images/84/Lying-close-grip-triceps-press-to-chin-1.png', 'Gym mat'), 
('Lat Pulldown', 'Sit at a lat pulldown machine and grab the bar with a wide grip. Pull the bar down towards your chest while squeezing your shoulder blades together. Slowly return to the starting position.', 'Increase strength', 'Lats', 'strongman', 'https://wger.de/media/exercise-images/475/b0554016-16fd-4dbe-be47-a2a17d16ae0e.jpg', 'Barbell'), 
('Dumbbell Lateral Raise', 'Stand with a dumbbell in each hand at your sides. Raise your arms to the sides until they are parallel to the floor, then slowly lower them back down.', 'Get fit', 'Deltoids', 'olympic weightlifting', 'https://wger.de/media/exercise-images/129/Standing-biceps-curl-1.png', 'Swiss ball'), 
('Standing Calf Raise', 'Stand on the edge of a step or platform with your heels hanging off. Raise your heels as high as possible, then lower them back down slowly.', 'Loose weight', 'Calves', 'plyometrics', 'https://wger.de/media/exercise-images/91/Crunches-1.png', 'Gym mat'), 
('Barbell Squat', 'Stand with your feet shoulder-width apart and a barbell on your upper back. Lower your body by bending your knees, keeping your back straight. Return to the starting position by pushing through your heels.', 'Gain weight', 'Quads, gluten', 'strongman', 'https://wger.de/media/exercise-images/86/Bicep-hammer-curl-1.png', 'Kettlebell'), 
('Reverse Fly', 'Hold a dumbbell in each hand, bend forward at the waist, and let your arms hang down. Raise your arms out to the sides until they are parallel to the floor, then slowly lower them back down.', 'Get fit', 'Deltoids', 'olympic weightlifting', 'https://wger.de/media/exercise-images/138/Hammer-curls-with-rope-1.png', 'Dumbbell'),
('Dumbbell Chest Press', 'Lie flat on a bench with a dumbbell in each hand. Press the dumbbells upward until your arms are fully extended, then lower them back down slowly.', 'Loose weight', 'Pectoralis major, chest', 'plyometrics', 'https://wger.de/media/exercise-images/195/Push-ups-1.png', 'Dumbbell'), 
('Romanian Deadlift', 'Hold a barbell in front of your thighs with a shoulder-width grip. Bend at the hips, lowering the bar down your legs, keeping your back straight. Return to the starting position by extending your hips.', 'Increase strength', 'Hamstrings, glutes', 'strongman', ' https://wger.de/media/exercise-images/161/Dead-lifts-2.png', 'Swiss ball'), 
('Kettlebell Swing', 'Stand with your feet shoulder-width apart and hold a kettlebell with both hands. Swing the kettlebell between your legs, then drive your hips forward to swing it up to chest level.', 'Gain weight', 'Hamstrings, glutes', 'olympic weightlifting', 'https://wger.de/media/exercise-images/128/Hyperextensions-1.png', 'Kettlebell, gym mat'), 
('Bulgarian Split Squat', 'Stand in a split stance with your back foot elevated on a bench. Lower your body until your back knee nearly touches the floor, then return to the starting position.', 'Loose weight', 'Quads, glutes', 'plyometrics', 'https://wger.de/media/exercise-images/138/Hammer-curls-with-rope-1.png', 'Body weight'), 
('One-Arm Dumbbell Row', 'Place one knee and hand on a bench for support. Hold a dumbbell in your other hand and pull it towards your waist, keeping your back straight.', 'Get fit', 'Lats, biceps', 'olympic weightlifting', 'https://wger.de/media/exercise-images/129/Standing-biceps-curl-1.png', 'Body weight'), 
('Cable Chest Fly', 'Stand between two cable machines with the handles in each hand. With a slight bend in your elbows, bring the handles together in front of your chest. Slowly return to the starting position.', 'Increase strength', 'Pectoralis major,chest', 'stretching', 'https://wger.de/media/exercise-images/84/Lying-close-grip-triceps-press-to-chin-1.png', 'Gym mat'), 
('Leg Press', 'Sit on a leg press machine and place your feet on the platform. Push the platform away from your body by extending your legs, then slowly return to the starting position.', 'Gain weight', 'Quads', 'strongman', 'https://wger.de/media/exercise-images/86/Bicep-hammer-curl-1.png', 'Barbell'), 
('Barbell Bent-Over Row', 'Hold a barbell with an overhand grip, bend your knees slightly, and hinge at the waist. Pull the barbell towards your torso, squeezing your shoulder blades together.', 'Loose weight', 'Lats, biceps', 'plyometrics', 'https://wger.de/media/exercise-images/91/Crunches-1.png', 'Gym mat'), 
('Tricep Dips', 'Sit on the edge of a bench or chair and place your hands beside your hips. Slide off the edge and lower your body by bending your elbows, then push back up to the starting position.', 'Get fit', 'Triceps', 'strongman', 'https://wger.de/media/exercise-images/138/Hammer-curls-with-rope-1.png', 'Body weight'), 
('Hammer Curl', 'Hold a dumbbell in each hand with your palms facing your torso. Curl the weights towards your shoulders while keeping your palms in the same position.', 'Gain weight', 'Biceps', 'olympic weightlifting', 'https://wger.de/media/exercise-images/128/Hyperextensions-1.png', 'Gym mat'), 
('Box Jump', 'Stand in front of a sturdy box or platform. Jump onto the box, landing softly with both feet. Step back down and repeat.', 'Loose weight', 'Quads, glutes', 'plyometrics', 'https://wger.de/media/exercise-images/86/Bicep-hammer-curl-1.png', 'Body weight'), 
('Seated Row', 'Sit at a seated row machine with your feet on the platform and hands on the handles. Pull the handles towards your waist while keeping your back straight, then slowly return to the starting position.', 'Increase strength', 'Lats, biceps', 'strongman', 'https://wger.de/media/exercise-images/143/Cable-seated-rows-2.png', 'Barbell'), 
('Incline Push-Up', 'Place your hands on an elevated surface, such as a bench or step, and your feet on the floor. Perform a push-up by lowering your chest towards the surface and then pushing back up.', 'Loose weight', 'Chest, triceps', 'olympic weightlifting', 'https://wger.de/media/exercise-images/195/Push-ups-1.png', 'Barbell'), 
('Dumbbell Pullover', 'Lie on a bench with your upper back supported and hold a dumbbell with both hands above your chest. Lower the dumbbell behind your head, then pull it back up over your chest.', 'Get fit', 'Lats, pectoralis major', 'stretching', 'https://wger.de/media/exercise-images/138/Hammer-curls-with-rope-1.png', 'Body weight'), 
('Glute Bridge', 'Lie on your back with your knees bent and feet flat on the floor. Lift your hips towards the ceiling by squeezing your glutes, then lower back down.', 'Gain weight', 'Glutes, hamstrings', 'olympic weightlifting', 'https://wger.de/media/exercise-images/128/Hyperextensions-1.png', 'Gym mat'), 
('Dumbbell Shrug', 'Hold a dumbbell in each hand at your sides. Lift your shoulders as high as possible towards your ears, then slowly lower them back down.', 'Loose weight', 'Traps', 'plyometrics', 'https://wger.de/media/exercise-images/81/Biceps-curl-1.png', 'Barbell');


