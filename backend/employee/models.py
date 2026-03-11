from django.db import models
import uuid


DEPARTMENT_CHOICES = [
    ("marketing", "Marketing"),
    ("technology", "Technology"),
    ("finance", "Finance"),
    ("operations", "Operations"),
]


class Employee(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=255, choices=DEPARTMENT_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Attendance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="attendance",
    )
    status = models.CharField(
        max_length=10, choices=[("present", "Present"), ("absent", "Absent")]
    )
    date = models.DateField()

    class Meta:
        ordering = ["-date"]
        unique_together = ["employee", "date"]
