﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SportBooking.Server.models;

namespace SportBooking.Server.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Court> Courts { get; set; }
        public DbSet<Media> Medias { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<BigCourt> bigCourts { get; set; }
        public DbSet<Invoice> Invoices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Booking>()
                    .HasOne(b => b.User)
                    .WithMany(u => u.Bookings)
                    .HasForeignKey(b => b.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Booking>()
                    .HasOne(b => b.Court)
                    .WithMany(c => c.Bookings)
                    .HasForeignKey(b => b.CourtId)
                    .OnDelete(DeleteBehavior.Cascade);

             modelBuilder.Entity<Court>()
                    .HasMany(c => c.TimeSlots)
                    .WithOne(ts => ts.Court)
                    .HasForeignKey(ts => ts.CourtId)
                    .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BigCourt>()
                    .HasMany(bc => bc.SportGrounds)
                    .WithOne(c => c.BigCourt)
                    .HasForeignKey(c => c.BigCourtId)
                    .OnDelete(DeleteBehavior.Cascade);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
