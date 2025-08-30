"use client"

import { useDialog } from '@/store/dialogs-store';
import React from 'react';
import { AuthDialog } from '../dialogs/auth-dialog';
import { SearchDialog } from '../dialogs/search-dialog';

export default function DialogProvider() {
  const { type } = useDialog();

  return (
    <>
      {type === 'auth' && <AuthDialog />}
      {type === 'search' && <SearchDialog />}
    </>
  );
}