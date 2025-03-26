from django.db import models
from django.contrib.auth.models import User

class Address(models.Model):
    content = models.CharField(max_length=200)
    etherscan_data = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="addresses")

    def __str__(self):
        if self.etherscan_data:
            if 'result' in self.etherscan_data:
                try:
                    balance = str(self.etherscan_data['result']) #ensure result is a string.
                    return f"{self.content} (Balance: {balance})"
                except (TypeError, ValueError) as e:
                    return f"{self.content} (Balance: Error: {e})"
            else:
                return f"{self.content} (Balance: Result key missing)"
        else:
            return self.content
        
