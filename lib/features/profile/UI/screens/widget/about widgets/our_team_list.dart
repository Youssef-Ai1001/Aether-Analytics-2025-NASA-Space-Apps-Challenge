import 'package:flutter/material.dart';
import 'bullet_point_item.dart';

class OurTeamList extends StatelessWidget {
  const OurTeamList({super.key});

  @override
  Widget build(BuildContext context) {
    final team = [
      'Youssef Khaled',
      'Youssef Taha',
      'Mohamed Abdelsatar',
      'Shahd Ayman',
      'Hassan',
      'Abdelrahman',
    ];

    return ListView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: team.length,
      padding: EdgeInsetsGeometry.zero,
      itemBuilder: (context, index) {
        return BulletPointItem(
          text: team[index],
          bulletColor: Colors.blueAccent,
        );
      },
    );
  }
}
