"use client"
import { UpdateUserModal } from '@/components/UpdateUserModal';
import { authClient } from '@/lib/auth-client';
import { Avatar } from '@heroui/react';
import { Card } from '@heroui/react';
import React from 'react';

const ProfilePage = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user
  return (
    <div>
      <Card className='max-w-96 mx-auto flex flex-col items-center my-30 border'>
        <Avatar className='h-20 w-20'>
        <Avatar.Image alt="John Doe" src={user?.image} 
        referrerPolicy='no-referrer' />
        <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
      </Avatar>

      <h2 className='text-xl font-bold'>{user?.name}</h2>
      <p>{user?.email}</p>

      <UpdateUserModal/>
      </Card>
      
    </div>
  );
};

export default ProfilePage;