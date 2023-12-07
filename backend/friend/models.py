from django.db import models
from django.conf import settings


# Create your models here.

# List of friends
class FriendList(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user")
    friends = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="friends")

    class Meta:
        verbose_name = "FriendList"
        verbose_name_plural = "FriendLists"

    def __str__(self):
        return self.user.username
    
    def add_friend(self, account):
        """ Add a new friend - core functionality """
        self.friends.add(account)
        self.save()

    def remove_friend(self, account):
        """ Remove friend - core functionality """
        self.friends.remove(account)
        self.save()

    def unfriend(self, to_unfriend):
        """ Allow self to remove to_unfriend (must be an user) from its friends list """
        
        # Access the remover's friend list and remove the target
        remover_friends_list = self
        remover_friends_list.remove_friend(to_unfriend)
        # Access the target's friend list and remove the remover
        removee_friends_list = FriendList.objects.get(user=to_unfriend)
        removee_friends_list.remove_friend(self.user)

    def is_friend(self, friend):
        """ Check if friend (user) is in the friends list """
        if friend in self.friends.all():
            return True
        else:
            return False

# List of friend requests
class FriendRequest(models.Model):
    """
    A friend requests consists of two parts:
      1. SENDER: person sending/starting the friend request
      2. RECEIVER: person receiving the friend request
    """
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sender")
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="receiver")
    is_active = models.BooleanField(blank=True, null=False, default=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "FriendRequest"
        verbose_name_plural = "FriendRequests"

    def __str__(self):
        return self.sender.username
    
    def accept(self):
        """
        Accept friend request
        Update sender's and receiver's friend list
        """
        receiver_friend_list = FriendList.objects.get(user=self.receiver)
        sender_friend_list = FriendList.objects.get(user=self.sender)

        if receiver_friend_list & sender_friend_list:
            receiver_friend_list.add_friend(self.sender)
            sender_friend_list.add_friend(self.receiver)
            self.is_active = False
            self.save()

    def decline(self):
        """
        Decline a friend request
        It is declined if the "is_active" field is set to False by the receiver
        """
        self.is_active(False)
        self.save()

    def cancel(self):
        """
        Cancel a friend request
        It is canceled if the "is_active" field is set to False by the sender
        """
        self.is_active(False)
        self.save()

