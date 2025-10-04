import 'package:flutter/material.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/about%20widgets/our_team_list.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/custom_profile_section.dart';

class OurTeamSection extends StatelessWidget {
  const OurTeamSection({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomProfileSection(title: "Our Team", body: OurTeamList());
  }
}
