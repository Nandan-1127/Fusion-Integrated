
import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Card,
  Text,
  Button,
  Select,
  TextInput,
  Textarea,
  Checkbox,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

interface Application {
  id?: number;
  leave_category: string;
  start_date: string;
  end_date: string;
  reason: string;
  half_day: boolean;
  status?: string;
}

const categories = [
  { value: "CL", label: "Casual Leave" },
  { value: "RH", label: "Regular Holiday" },
  { value: "SCL", label: "Special Casual Leave" },
  { value: "EL", label: "Earned Leave" },
  { value: "COL", label: "Compensatory Off Leave" },
  { value: "VL", label: "Vacation Leave" },
];

const emptyForm: Application = {
  leave_category: "CL",
  start_date: "",
  end_date: "",
  reason: "",
  half_day: false,
};

const API_URL = "/api/v1/elm/applications";

const LeaveApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [formData, setFormData] = useState<Application>({ ...emptyForm });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchApplications = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load applications");
      }

      const data = await response.json();
      setApplications(data);
    } catch {
      notifications.show({
        title: "Error",
        message: "Could not load leave applications.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchApplications();
  }, []);

  const submitApplication = async () => {
    if (
      !formData.start_date ||
      !formData.end_date ||
      !formData.reason.trim()
    ) {
      notifications.show({
        title: "Missing information",
        message: "Please complete all required fields.",
        color: "red",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Unable to submit application");
      }

      notifications.show({
        title: "Success",
        message: "Leave application submitted.",
        color: "green",
      });

      setFormData({ ...emptyForm });
      await fetchApplications();
    } catch {
      notifications.show({
        title: "Error",
        message: "Could not submit the application.",
        color: "red",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container size="lg" py="md">
      <Stack gap="md">
        <Text size="xl" fw={700}>
          Employee Leave Management
        </Text>

        <Card withBorder padding="md">
          <Text fw={600} mb="sm">
            My Leave Applications
          </Text>

          {loading ? (
            <Text>Loading applications...</Text>
          ) : applications.length === 0 ? (
            <Text>No leave applications to display.</Text>
          ) : (
            <Stack gap="sm">
              {applications.map((application, index) => (
                <Card key={application.id ?? index} withBorder>
                  <Text>
                    Category:{" "}
                    {categories.find(
                      (item) => item.value === application.leave_category
                    )?.label ?? application.leave_category}
                  </Text>
                  <Text>Start Date: {application.start_date}</Text>
                  <Text>End Date: {application.end_date}</Text>
                  <Text>Reason: {application.reason}</Text>
                  <Text>Status: {application.status ?? "Pending"}</Text>
                  <Text>
                    Half Day: {application.half_day ? "Yes" : "No"}
                  </Text>
                </Card>
              ))}
            </Stack>
          )}
        </Card>

        <Card withBorder padding="md">
          <Text fw={600} mb="sm">
            Apply for Leave
          </Text>

          <Stack gap="sm">
            <Select
              label="Leave Category"
              data={categories}
              value={formData.leave_category}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  leave_category: value ?? "CL",
                })
              }
            />

            <TextInput
              label="Start Date"
              type="date"
              value={formData.start_date}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  start_date: event.currentTarget.value,
                })
              }
              required
            />

            <TextInput
              label="End Date"
              type="date"
              value={formData.end_date}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  end_date: event.currentTarget.value,
                })
              }
              required
            />

            <Textarea
              label="Reason"
              value={formData.reason}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  reason: event.currentTarget.value,
                })
              }
              required
            />

            <Checkbox
              label="Half Day"
              checked={formData.half_day}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  half_day: event.currentTarget.checked,
                })
              }
            />

            <Button onClick={submitApplication} loading={submitting}>
              Submit Application
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default LeaveApplicationsPage;
