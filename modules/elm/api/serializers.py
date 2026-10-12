from rest_framework import serializers
from modules.elm.models import LeaveApplication
from modules.directory.models import UserRef

class UserRefSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRef
        fields = ['user_id', 'username', 'display_name', 'kind', 'email']

class LeaveApplicationSerializer(serializers.ModelSerializer):
    employee = UserRefSerializer(read_only=True)
    leave_category = serializers.ChoiceField(choices=LeaveApplication.LEAVE_CATEGORIES)

    class Meta:
        model = LeaveApplication
        fields = ['id', 'employee', 'leave_category', 'start_date', 'end_date', 'reason', 'status', 'half_day', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
