import {Card, CardContent, alpha} from "@mui/material";

const DefaultCard = ({children}) => {
  return <Card
    sx={{
      boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
    }}
  >
    <CardContent>
      {children}
    </CardContent>
  </Card>
}

export default DefaultCard;
