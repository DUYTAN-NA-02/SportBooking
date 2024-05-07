using Microsoft.EntityFrameworkCore;
using SportBooking.Server.Data;
using SportBooking.Server.Interfaces;
using SportBooking.Server.models;

namespace SportBooking.Server.Repository
{
    public class MediaRepository : IMediaRepository
    {
        private readonly DataContext _context;
        public MediaRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Media>?> AddMedia(int idCourt, List<string> urls)
        {
            await _context.Medias.AddRangeAsync(urls.Select(url => new Media { CourtId = idCourt, Url = url }));
            bool result = await Save();
            if (result)
            {
                return await _context.Medias.Where(x => x.CourtId == idCourt).ToListAsync();
            }
            return null;
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

    }
}
