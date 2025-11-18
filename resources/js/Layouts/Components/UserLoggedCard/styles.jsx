import {styled} from "@mui/material/styles";
import {Avatar, Box, Typography} from "@mui/material";

export const WrapperCard = styled(Box)({
  position: 'relative',
  margin: '25px 15px',
  backgroundColor: '#ffffff',
  color: 'inherit',
  borderRadius: 6,
  padding: '5px 15px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
});

export const UserAvatar = styled(Avatar)({
  marginRight: '15px'
});

export const UserName = styled(Typography)({
  marginBottom: '0px',
  wordBreak: 'break-word',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  maxWidth: '150px'
});

export const UserEmail = styled(Typography)({
  marginBottom: '0px',
  wordBreak: 'break-word',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  maxWidth: '150px'
});
