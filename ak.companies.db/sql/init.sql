create database companies;

use companies;

create table Companies
(
    Id int
    auto_increment primary key,
    Name    varchar
    (200) not null,
    Ticker  varchar
    (5)   not null,
    Isin    varchar
    (12)  not null,
    Website text         null,
    constraint IX_UNIQUE_ISIN unique
    (Isin)
);

create table __EFMigrationsHistory
(
    MigrationId varchar(150) not null
        primary key,
    ProductVersion varchar(32) not null
);

insert into Companies(Name, Ticker, Isin, Website) values("Apple Inc.", "AAPL", "US0378331005", "www.apple.com");
insert into Companies(Name, Ticker, Isin, Website) values("Nike", "NKE", "US6541061031", "www.nike.com");
insert into Companies(Name, Ticker, Isin, Website) values("IBM", "IBM", "US4592001014", "www.ibm.com");
insert into Companies(Name, Ticker, Isin, Website) values("Verizon", "VZ", "US92343V1044", "www.verizon.com");
insert into Companies(Name, Ticker, Isin, Website) values("	JPMorgan Chase & Co.", "JPM", "US46625H1005", "www.jpmorgan.com");