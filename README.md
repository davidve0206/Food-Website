# FoodPal, a "Tinder" for finding your next meal with your partner of friends
This is a practice project on my path of learning Web Development; you can find the website hosted on https://d2frquv685fztr.cloudfront.net/.

The project's core functionalities are:
- Friends
  - Send/receive friend requests
    - This requires the ability to search for users to become friends 
  - Accept/request friend requests
  - Remove friends after they have been accepted
- Food
  - See a list of potential food options
  - Like or Dislike each option
    - Users can have different decisions with each friend
  - Reset choices already made if user wants to change opinions
  - See matches (Dishes that both the user and his friend liked)

The repository has two branches, one for development (main) and one with the changes made for production as described below.

## Technologies used
- Frontend
  - ReactJS (JavaScript)
  - React Router Dom for navigation
  - React Hook Form to streamline forms
- Backend
  - Django (Python)
  - Exposed API endpoints using Django REST Framework

## Production architecture (AWS)
The website's frontend is accessed through AWSCloudfront which exposes an S3 bucket containing the static website (created using npm run build).
The backend API is accessed through APIGateway and is hosted on an EC2 (to avoid timeouts at startup) using Gunicorn and a Systemd service to maintain it running. Media and static files are held in a separate S3 bucket.

## Considerations to use on local (main branch)
You will need to update CORS_ALLOWED_ORIGINS in setting.py on the backend and url in utils/api-service.js with your corresponding localhosts.

## To improve
There are a few thing to improve, both from a functionality and development perspective:
- Functionality
  - Improve security: the project currently uses basic token authentication as provided by Django Rest Framework
  - Allow users to upload their own food options: currently this can only be done through the Django admin console
  - Improve recommendations: currently the options are provided at random, but they could take the users previous choices into account
- Development
  - Testing: the project currently has no tests on either the front of back end
  - API connection: currently a single utility file using fetch(), this may have space to be optimized
