from django.test import TestCase

# Create your tests here.
class UsersTestClass(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create two users two begin testing
        pass

    def setUp(self):
        # Placeholder if we need a setup that runs before each test
        pass

    def test_unauthenticated_user_cant_see_user_list(self):
        pass
    
    def test_authenticated_user_can_see_user_list(self):
        pass
    
    def test_users_dont_show_in_friend_list(self):
        pass
    
    def test_users_can_send_friend_request(self):
        # User1 can send a friend request and User2 can see the request in its request list
        pass
    
    def test_users_can_accept_friend_request(self):
        # Accepted friend requests show in the both user's friend list
        pass