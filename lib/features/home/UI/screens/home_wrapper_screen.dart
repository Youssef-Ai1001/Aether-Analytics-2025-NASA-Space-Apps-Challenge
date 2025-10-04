import 'package:flutter/material.dart';
import 'package:nasa_app/features/home/UI/screens/widget/custom_bottom_nav_bar.dart';
import '../../../alerts/UI/screens/alerts_screen.dart';
import '../../../community/UI/screens/community_screen.dart';
import '../../../profile/UI/screens/profile_screen.dart';
import 'home_screen.dart';

class HomeWrapperScreen extends StatefulWidget {
  const HomeWrapperScreen({super.key});

  @override
  State<HomeWrapperScreen> createState() => _HomeWrapperScreenState();
}

class _HomeWrapperScreenState extends State<HomeWrapperScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    HomeScreen(),
    AlertsScreen(),
    CommunityScreen(),
    ProfileScreen(),
  ];

  void _onTabTapped(int index) {
    setState(() => _currentIndex = index);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(index: _currentIndex, children: _screens),
      bottomNavigationBar: CustomBottomNavBar(
        currentIndex: _currentIndex,
        onTap: _onTabTapped,
      ),
    );
  }
}
