﻿namespace SportBooking.Server.ValidData
{
    public class VaildLoginRegister
    {
        public static bool IsEmail(string email)
        {
            return new System.Text.RegularExpressions.Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$").IsMatch(email);
        }
        public static bool IsPassword(string password)
        {
            return new System.Text.RegularExpressions.Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$").IsMatch(password);
        }
        public static bool IsPhoneNumber(string phoneNumber)
        {
            return new System.Text.RegularExpressions.Regex(@"^(\+84)\d{9,10}$").IsMatch(phoneNumber);
        }
    }
}
