
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from fusion_auth.permissions import HasPermission
from modules.directory.models import UserRef
from modules.elm.api.serializers import LeaveApplicationSerializer
from modules.elm.models import LeaveApplication


class LeaveApplicationListCreateView(APIView):
    permission_classes = [
        HasPermission('elm.leave.view_self', 'elm.leave.apply')
    ]

    def get(self, request):
        user_id = request.principal.user_id

        try:
            user = UserRef.objects.get(user_id=user_id)
        except UserRef.DoesNotExist:
            return Response(
                {"error": "Employee record not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        leave_applications = LeaveApplication.objects.filter(employee=user)
        serializer = LeaveApplicationSerializer(
            leave_applications, many=True
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user_id = request.principal.user_id

        try:
            user = UserRef.objects.get(user_id=user_id)
        except UserRef.DoesNotExist:
            return Response(
                {"error": "Employee record not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = LeaveApplicationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(employee=user)
            return Response(
                serializer.data, status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )
