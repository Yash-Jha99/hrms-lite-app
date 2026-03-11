from django.db.models import Q, Count
from rest_framework import mixins, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser
from employee.models import Attendance, Employee
from employee.serializers import (
    AttendanceSerializer,
    EmployeeSerializer,
)


class EmployeeViewSet(
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Employee.objects.annotate(
        total_present=Count("attendance", filter=Q(attendance__status="present"))
    ).order_by("id")
    serializer_class = EmployeeSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]


class AttendanceViewSet(
    viewsets.ModelViewSet,
):
    queryset = Attendance.objects.select_related("employee").all()
    serializer_class = AttendanceSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        queryset = super().get_queryset()
        employee_id = self.request.query_params.get("employee_id")
        date = self.request.query_params.get("date")

        if employee_id:
            queryset = queryset.filter(employee__id=employee_id)

        if date:
            queryset = queryset.filter(date=date)

        return queryset

    def get_serializer(self, *args, **kwargs):
        kwargs["many"] = True
        return super().get_serializer(*args, **kwargs)
