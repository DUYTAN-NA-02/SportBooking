namespace SportBooking.Server.ValidData
{
    public class ValidDateTime
    {
        public static bool IsDateTimeSmallThenNow(string dateTime)
        {
            try
            {
                DateTime date = DateTime.Parse(dateTime);
                if (date < DateTime.Now)
                {
                    return false;
                }
                return true;
            }
            catch
            {
                return false;
            }
        }
        public static bool isDateTimeType(string dateTime)
        {
            try
            {
                DateTime date = DateTime.Parse(dateTime);
                return true;
            }
            catch
            {
                return false;
            }
        }
        public static bool isDateStartSmallDateEnd(string dateStart, string dateEnd)
        {
            try
            {
                DateTime start = DateTime.Parse(dateStart);
                DateTime end = DateTime.Parse(dateEnd);
                if (start > end)
                {
                    return false;
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
