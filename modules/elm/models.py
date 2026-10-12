from django.db import models
from core.db.mixins import TimeStampedModel
from modules.directory.models import UserRef

class LeaveApplication(TimeStampedModel):
    LEAVE_CATEGORIES = [
        ('CL', 'Casual Leave'),
         ('RH', 'Regular Holiday'),
         ('SCL', 'Special Casual Leave'),
         ('EL', 'Earned Leave'),
         ('COL', 'Compensatory Off Leave'),
         ('VL', 'Vacation Leave'),
    ]

    STATUS_CHOICES = [
         ('P', 'Pending'),
         ('A', 'Approved'),
         ('R', 'Rejected'),
    ]

    employee = models.ForeignKey(UserRef, on_delete=models.CASCADE, db_column='user_id', related_name='leave_applications')
    leave_category = models.CharField(max_length=3, choices=LEAVE_CATEGORIES)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    half_day = models.BooleanField(default=False)

    class Meta:
        db_table = 'elm_leave_application'
        indexes = [
            models.Index(fields=['employee', 'start_date', 'end_date']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f'{self.employee.username} - {self.get_leave_category_display()} from {self.start_date} to {self.end_date}'
