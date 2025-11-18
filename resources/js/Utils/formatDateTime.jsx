import moment from "moment";

export default (dateTime) => {
  return moment(dateTime).format('DD/MM/Y \\à\\s HH:mm:ss');
};
