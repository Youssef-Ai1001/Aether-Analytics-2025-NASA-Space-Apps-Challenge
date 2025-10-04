import 'package:flutter/material.dart';
import 'package:iconly/iconly.dart';

import '../build_switch_item.dart';
import '../custom_profile_section.dart';

class NotificationSection extends StatefulWidget {
  const NotificationSection({super.key});

  @override
  State<NotificationSection> createState() => _NotificationSectionState();
}

class _NotificationSectionState extends State<NotificationSection> {
  // Notification switches
  bool notifications = true;
  bool emailSummaries = false;
  bool communityUpdates = true;

  @override
  Widget build(BuildContext context) {
    return CustomProfileSection(
      icon: IconlyLight.notification,
      iconColor: Colors.orange,
      title: "Notifications",
      body: Column(
        children: [
          BuildSwitchItem(
            label: "Push Notifications",
            subLabel: "Receive alerts and updates",
            value: notifications,
            onChanged: (val) => setState(() => notifications = val),
          ),
          BuildSwitchItem(
            label: "Email Summaries",
            subLabel: "Weekly air quality reports",
            value: emailSummaries,
            onChanged: (val) => setState(() => emailSummaries = val),
          ),
          BuildSwitchItem(
            label: "Community Updates",
            subLabel: "New posts and insights",
            value: communityUpdates,
            onChanged: (val) => setState(() => communityUpdates = val),
          ),
        ],
      ),
    );
  }
}
