
"""Module metadata and navigation for Employee Leave Management."""

MODULE = {
    "code": "elm",
    "label": "Employee Leave Management",
    "icon": "CalendarCheck",
    "base_path": "/elm",
    "nav_section": "Employee Leave Management",
    "sort_order": 20,
    "status": "active",
}

NAV_ITEMS = [
    {
        "code": "elm.applications",
        "label": "My Leave Applications",
        "icon": "CalendarCheck",
        "to": "/elm/applications",
        "required_permission": "elm.leave.view_self",
        "sort_order": 10,
    },
]

PERMISSIONS = [
    ("elm.leave.view_self", "View own leave applications"),
    ("elm.leave.apply", "Apply for leave"),
    ("elm.leave.process", "Process leave applications"),
]

SYSTEM_PERMISSIONS = []

ROLE_GRANTS = {
    "faculty": [
        "elm.leave.view_self",
        "elm.leave.apply",
    ],
    "staff": [
        "elm.leave.view_self",
        "elm.leave.apply",
    ],
}
