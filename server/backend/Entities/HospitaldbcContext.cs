using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Entities;

public partial class HospitaldbcContext : DbContext
{
    public HospitaldbcContext()
    {
    }

    public HospitaldbcContext(DbContextOptions<HospitaldbcContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Hospital> Hospitals { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }
//        => optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=VV!Zh8!$;database=hospitaldbc");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Hospital>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("hospitals");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .HasColumnName("location");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .HasColumnName("phone");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasColumnName("type");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
