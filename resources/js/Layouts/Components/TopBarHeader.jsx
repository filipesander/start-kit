import { styled } from "@mui/material";

const TopBarHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  justifyContent: 'space-between',
  ...theme.mixins.toolbar,
}));

export default TopBarHeader;
