namespace Back.Infra.Repository;

using Back.Domain;
using Microsoft.EntityFrameworkCore;

public interface ICatImageRepository {
    Task<List<CatImage>> GetAllAsync();
    Task<CatImage?> GetByIdAsync(string id);
	Task<bool> IdsExistAsync(string[] ids);
	Task UpdateAsync(CatImage catImage);
	Task SaveChangesAsync();

}

public class CatImageRepository(CatMashDBContext context) : ICatImageRepository
{
    private readonly CatMashDBContext _context = context;

    public Task<List<CatImage>> GetAllAsync()
    {
        return  _context.CatImages
			.Select(c => new CatImage { Id = c.Id, Url = c.Url, Score = c.Score })
			.ToListAsync();
    }

    public Task<CatImage?> GetByIdAsync(string id)
    {
        return _context.CatImages.FirstOrDefaultAsync(c => c.Id == id);
    }

	public async Task<bool> IdsExistAsync(string[] ids)
	{
		int count = await _context.CatImages
			.Where(c => ids.Contains(c.Id))
			.CountAsync();
		return count == ids.Length;
	}

	public Task SaveChangesAsync()
	{
		return _context.SaveChangesAsync();
	}

	public Task UpdateAsync(CatImage catImage)
	{
		_context.CatImages.Update(catImage);
		return Task.CompletedTask;
	}
}