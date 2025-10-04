import 'package:flutter/material.dart';
import 'package:iconly/iconly.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/custom_profile_section.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/profile%20widgets/personal_information_item.dart';

class PersonalInformationSection extends StatelessWidget {
  const PersonalInformationSection({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomProfileSection(
      icon: IconlyLight.profile,
      iconColor: Colors.blueAccent,
      title: "Personal Information",
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          PersonalInformationItem(
            icon: IconlyLight.profile,
            iconColor: Colors.green,
            title: "Username",
            subTitle: "AlexChen",
          ),
          const SizedBox(height: 10),
          PersonalInformationItem(
            icon: IconlyLight.message,
            iconColor: Colors.blue,
            title: "Email Address",
            subTitle: "alex.chen@email.com",
          ),
          const SizedBox(height: 10),
          PersonalInformationItem(
            icon: IconlyLight.location,
            iconColor: Colors.red,
            title: "Location",
            subTitle: "San Francisco, CA",
          ),
        ],
      ),
    );
  }
}
