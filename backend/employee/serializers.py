from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.validators import UniqueTogetherValidator
from .models import Attendance, Employee


class EmployeeSerializer(serializers.ModelSerializer):
    total_present = serializers.IntegerField(read_only=True)

    class Meta:
        model = Employee
        fields = ["id", "department", "name", "email", "total_present"]


class AttendanceSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    employee_id = PrimaryKeyRelatedField(
        queryset=Employee.objects.all(), source="employee", write_only=True
    )

    class Meta:
        model = Attendance
        fields = "__all__"
        validators = [
            UniqueTogetherValidator(
                queryset=Attendance.objects.all(),
                fields=["date", "employee"],
                message="Attendance already marked for the date.",
            )
        ]
