namespace SportBooking.Server.ValidData
{
    public class ValidEnum
    {
        public static bool IsDefined(Type enumType, object value)
        {
            if (enumType == null)
                throw new ArgumentNullException("enumType");
            return enumType.IsEnumDefined(value);
        }
    }

}
