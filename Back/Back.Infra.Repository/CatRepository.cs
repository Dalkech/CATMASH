namespace Back.Infra.Repository;
using Microsoft.EntityFrameworkCore;

public interface ICatRepository {
    Task<List<CatImage>> GetAllAsync();
    Task<CatImage?> GetByIdAsync(string id);
}

public class CatRepository(CatMashDBContext context) : ICatRepository
{
    private readonly CatMashDBContext _context = context;

    public Task<List<CatImage>> GetAllAsync()
    {
        return  _context.CatImages.ToListAsync();
    }

    public Task<CatImage?> GetByIdAsync(string id)
    {
        return _context.CatImages.FirstOrDefaultAsync(c => c.Id == id);
    }
}