using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyApp.Data.Entities;

namespace MyApp.Data;
public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Account> Accounts => Set<Account>();
    public DbSet<Bank> Banks => Set<Bank>();
    public DbSet<Contact> Contacts => Set<Contact>();
    public DbSet<Expense> Expenses => Set<Expense>();
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entities = ChangeTracker
            .Entries<BaseEntity>()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entities)
        {
            entry.Entity.UpdateAtUtc = DateTime.UtcNow;

            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreateAtUtc = DateTime.UtcNow;
            }
        }
        return await base.SaveChangesAsync(cancellationToken);
    }
}

public class BankEntityConfiguration : IEntityTypeConfiguration<Bank>
{
    public void Configure(EntityTypeBuilder<Bank> builder)
    {
        builder
            .HasOne(entity => entity.User)
            .WithMany()
            .HasForeignKey(entity => entity.UserId);

        builder
            .HasIndex(entity => entity.UserId)
            .IsUnique(false);
    }
}

public class AccountEntityConfiguration : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder
            .HasMany(entity => entity.Expenses)
            .WithOne()
            .HasForeignKey(expense => expense.AccountId)
            .OnDelete(DeleteBehavior.Cascade);
    } 
}