import {UserAvatar, UserEmail, UserName, WrapperCard} from "@/Layouts/Components/UserLoggedCard/styles";
import {usePage} from "@inertiajs/react";
import {Box} from "@mui/material";
import React from "react";

export const UserLoggedCard = () => {
  const {auth: {user}} = usePage().props;

  return (
    <WrapperCard>
      <UserAvatar src={user?.gravatar} alt="Foto de Perfil" sx={{ width: 45, height: 45 }} />
      <Box>
        <UserName variant='h6'>{user?.name}</UserName>
      </Box>
    </WrapperCard>
  )
}
