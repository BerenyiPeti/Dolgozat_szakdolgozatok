USE [probavizsga2022]
GO

/****** Object:  Table [dbo].[Szakdolgozatok]    Script Date: 2023. 04. 27. 12:02:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Szakdolgozatok](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[szakdoga_nev] [nvarchar](max) NOT NULL,
	[githublink] [nvarchar](max) NOT NULL,
	[oldallink] [nvarchar](max) NOT NULL,
	[tagokneve] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Szakdolgozatok] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


