import {Card, CardContent} from "@mui/material";

const DefaultCard = ({children}) => {
  return <Card>
    <CardContent>
      {children}
    </CardContent>
  </Card>
}

export default DefaultCard;
