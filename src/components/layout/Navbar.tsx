import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Leaf, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";

const navLinks = [
	{ name: "Home", path: "/" },
	{ name: "Products", path: "/products" },
	{ name: "About", path: "/about" },
	{
		name: "Become a Vendor",
		path: "/vendor",
		isExternal: true,
		externalUrl: "https://klickit-merchant.vercel.app",
	},
	{ name: "Contact", path: "/contact" },
];

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const { isAuthenticated, user, logout } = useAuthContext();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link to="/" className="flex items-center gap-2">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
						<Leaf className="h-6 w-6 text-primary-foreground" />
					</div>
					<span className="font-display text-xl font-bold text-foreground">
						Klickit
					</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden items-center gap-1 md:flex">
					{navLinks.map((link) => {
						if (link.isExternal) {
							return (
								<a
									key={link.externalUrl}
									href={link.externalUrl}
									className="rounded-lg px-4 py-2 text-sm font-medium transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground"
								>
									{link.name}
								</a>
							);
						}
						return (
							<Link
								key={link.path}
								to={link.path}
								className={cn(
									"rounded-lg px-4 py-2 text-sm font-medium transition-colors",
									location.pathname === link.path
										? "bg-primary/10 text-primary"
										: "text-muted-foreground hover:bg-secondary hover:text-foreground"
								)}
							>
								{link.name}
							</Link>
						);
					})}
				</nav>

				<div className="hidden items-center gap-3 md:flex">
					{isAuthenticated && user ? (
						<>
							<div className="flex items-center gap-2">
								{user.picture && (
									<img
										src={user.picture}
										alt={user.name}
										className="h-8 w-8 rounded-full"
									/>
								)}
								<span className="text-sm font-medium text-foreground">
									{user.name}
								</span>
							</div>
							<Button
								variant="ghost"
								size="sm"
								onClick={logout}
								className="gap-2"
							>
								<LogOut className="h-4 w-4" />
								Logout
							</Button>
						</>
					) : (
						<>
							<Link to="/cart">
								<Button variant="ghost" size="icon" className="relative">
									<ShoppingCart className="h-5 w-5" />
									<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-soft-orange text-xs font-bold text-primary-foreground">
										2
									</span>
								</Button>
							</Link>
							<Link to="/login">
								<Button variant="hero" size="sm">
									Login
								</Button>
							</Link>
						</>
					)}
				</div>

				{/* Mobile Menu Button */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="rounded-lg p-2 text-foreground hover:bg-secondary md:hidden"
				>
					{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>
			</div>

			{/* Mobile Navigation */}
			{isOpen && (
				<nav className="border-t border-border bg-background p-4 md:hidden">
					<div className="flex flex-col gap-2">
						{navLinks.map((link) => {
							if (link.isExternal) {
								return (
									<a
										key={link.externalUrl}
										href={link.externalUrl}
										className="rounded-lg px-4 py-3 text-sm font-medium transition-colors text-muted-foreground hover:bg-secondary"
									>
										{link.name}
									</a>
								);
							}
							return (
								<Link
									key={link.path}
									to={link.path}
									onClick={() => setIsOpen(false)}
									className={cn(
										"rounded-lg px-4 py-3 text-sm font-medium transition-colors",
										location.pathname === link.path
											? "bg-primary/10 text-primary"
											: "text-muted-foreground hover:bg-secondary"
									)}
								>
									{link.name}
								</Link>
							);
						})}
						{isAuthenticated && user ? (
							<>
								<div className="my-2 border-t border-border pt-2">
									<div className="flex items-center gap-2 px-4 py-2">
										{user.picture && (
											<img
												src={user.picture}
												alt={user.name}
												className="h-8 w-8 rounded-full"
											/>
										)}
										<span className="text-sm font-medium">
											{user.name}
										</span>
									</div>
								</div>
								<Button
									variant="outline"
									className="w-full gap-2"
									onClick={() => {
										logout();
										setIsOpen(false);
									}}
								>
									<LogOut className="h-4 w-4" />
									Logout
								</Button>
							</>
						) : (
							<div className="mt-4 flex items-center gap-3">
								<Link to="/cart" className="flex-1">
									<Button variant="outline" className="w-full">
										<ShoppingCart className="h-4 w-4" />
										Cart (2)
									</Button>
								</Link>
								<Link to="/login" className="flex-1">
									<Button variant="hero" className="w-full">
										Login
									</Button>
								</Link>
							</div>
						)}
					</div>
				</nav>
			)}
		</header>
	);
}
