import 'package:flutter/material.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/about%20widgets/about_part.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/profile_action_section.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/profile%20widgets/profile_part.dart';
import 'package:nasa_app/features/profile/UI/screens/widget/settings%20widgets/settings_part.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  int selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        top: false,
        child: CustomScrollView(
          slivers: [
            /// Header (filter buttons)
            SliverToBoxAdapter(
              child: ProfileActionSection(
                selectedIndex: selectedIndex,
                onTap: (index) => setState(() => selectedIndex = index),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 12)),

            /// Dynamic part
            if (selectedIndex == 0)
              const ProfilePart()
            else if (selectedIndex == 1)
              const SettingsPart()
            else if (selectedIndex == 2)
              const AboutPart(),

            const SliverToBoxAdapter(child: SizedBox(height: 16)),
          ],
        ),
      ),
    );
  }
}
