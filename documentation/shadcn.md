Below is a compressed yet complete reference for quickly integrating each shadcn component. **Assumption**: you already have the files from your question in `@/components/ui/*.tsx` and can import them directly. All components accept typical React props plus any Radix/3rd-party props. Adjust styling and props as needed.Do not rewrite any of the code for the shadcn components.

---

## 1. Accordion

**Import**

```ts
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
```

**Minimal usage**

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section One</AccordionTrigger>
    <AccordionContent>Panel content here.</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## 2. Alert Dialog

**Import**

```ts
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
```

**Minimal usage**

```tsx
<AlertDialog>
  <AlertDialogTrigger>Delete something</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action is irreversible.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Confirm</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## 3. Alert

**Import**

```ts
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
```

**Minimal usage**

```tsx
<Alert variant="destructive">
  <AlertTitle>Error!</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

---

## 4. Aspect Ratio

**Import**

```ts
import { AspectRatio } from "@/components/ui/aspect-ratio";
```

**Minimal usage**

```tsx
<AspectRatio ratio={16 / 9}>
  <img src="/some-image.jpg" alt="..." className="object-cover" />
</AspectRatio>
```

---

## 5. Avatar

**Import**

```ts
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
```

**Minimal usage**

```tsx
<Avatar>
  <AvatarImage src="/me.png" alt="Avatar" />
  <AvatarFallback>ME</AvatarFallback>
</Avatar>
```

---

## 6. Badge

**Import**

```ts
import { Badge } from "@/components/ui/badge";
```

**Minimal usage**

```tsx
<Badge variant="secondary">Badge Text</Badge>
```

---

## 7. Breadcrumb

**Import**

```ts
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
```

**Minimal usage**

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

(Use `BreadcrumbSeparator` or `BreadcrumbEllipsis` as needed.)

---

## 8. Button

**Import**

```ts
import { Button } from "@/components/ui/button";
```

**Minimal usage**

```tsx
<Button variant="outline" size="sm">
  Click Me
</Button>
```

---

## 9. Calendar

**Import**

```ts
import { Calendar } from "@/components/ui/calendar";
```

**Minimal usage**

```tsx
<Calendar
  mode="single"
  selected={new Date()}
  onSelect={(date) => console.log(date)}
/>
```

---

## 10. Card

**Import**

```ts
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
```

**Minimal usage**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Short description</CardDescription>
  </CardHeader>
  <CardContent>Card content here...</CardContent>
  <CardFooter>Footer actions here</CardFooter>
</Card>
```

---

## 11. Carousel

**Import**

```ts
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
```

**Minimal usage**

```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

---

## 12. Chart

**Import**

```ts
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
```

**Minimal usage (example with Recharts)**

```tsx
<ChartContainer config={{ MyDataKey: { label: "My Label", color: "#1d4ed8" } }}>
  <ResponsiveContainer>
    <LineChart data={data}>
      <Line dataKey="MyDataKey" />
      <ChartTooltip content={<ChartTooltipContent />} />
      <ChartLegend content={<ChartLegendContent />} />
    </LineChart>
  </ResponsiveContainer>
</ChartContainer>
```

---

## 13. Checkbox

**Import**

```ts
import { Checkbox } from "@/components/ui/checkbox";
```

**Minimal usage**

```tsx
<Checkbox
  checked={isChecked}
  onCheckedChange={(checked) => setIsChecked(Boolean(checked))}
/>
```

---

## 14. Collapsible

**Import**

```ts
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
```

**Minimal usage**

```tsx
<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>
```

---

## 15. Command (CmdK style)

**Import**

```ts
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
```

**Minimal usage**

```tsx
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandItem>Action 1</CommandItem>
    <CommandItem>Action 2</CommandItem>
  </CommandList>
</CommandDialog>
```

---

## 16. Context Menu

**Import**

```ts
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";
```

**Minimal usage**

```tsx
<ContextMenu>
  <ContextMenuTrigger>
    <button>Right-click me</button>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Action 1</ContextMenuItem>
    <ContextMenuItem>Action 2</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

---

## 17. Dialog

**Import**

```ts
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
```

**Minimal usage**

```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <div>Dialog body content</div>
    <DialogFooter>{/* Buttons here */}</DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 18. Drawer (Vaul)

**Import**

```ts
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
```

**Minimal usage**

```tsx
<Drawer>
  <DrawerTrigger>Open Drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>Some description</DrawerDescription>
    </DrawerHeader>
    <div>Drawer body</div>
  </DrawerContent>
</Drawer>
```

---

## 19. Dropdown Menu

**Import**

```ts
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
```

**Minimal usage**

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## 20. Form (React Hook Form utils)

**Import**

```ts
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
```

**Minimal usage**

```tsx
const form = useForm()

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <input type="email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

---

## 21. Hover Card

**Import**

```ts
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
```

**Minimal usage**

```tsx
<HoverCard>
  <HoverCardTrigger>Hover over me</HoverCardTrigger>
  <HoverCardContent>Tooltip-like content</HoverCardContent>
</HoverCard>
```

---

## 22. Input OTP

**Import**

```ts
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
```

**Minimal usage**

```tsx
<InputOTP
  length={4}
  onComplete={(value) => console.log(value)}
  renderSeparator={() => <span>-</span>}
  renderSlot={(slotProps) => <InputOTPSlot {...slotProps} />}
/>
```

---

## 23. Input

**Import**

```ts
import { Input } from "@/components/ui/input";
```

**Minimal usage**

```tsx
<Input placeholder="Type here" />
```

---

## 24. Label

**Import**

```ts
import { Label } from "@/components/ui/label";
```

**Minimal usage**

```tsx
<Label htmlFor="name">Name</Label>
<input id="name" />
```

---

## 25. Menubar

**Import**

```ts
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
```

**Minimal usage**

```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Menu</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Item</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

---

## 26. Navigation Menu

**Import**

```ts
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
```

**Minimal usage**

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/">Link 1</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

---

## 27. Pagination

**Import**

```ts
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
```

**Minimal usage**

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="?page=1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="?page=2" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

---

## 28. Popover

**Import**

```ts
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
```

**Minimal usage**

```tsx
<Popover>
  <PopoverTrigger>Open Popover</PopoverTrigger>
  <PopoverContent>Popover content here</PopoverContent>
</Popover>
```

---

## 29. Progress

**Import**

```ts
import { Progress } from "@/components/ui/progress";
```

**Minimal usage**

```tsx
<Progress value={50} className="w-56" />
```

---

## 30. Radio Group

**Import**

```ts
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
```

**Minimal usage**

```tsx
<RadioGroup defaultValue="1">
  <RadioGroupItem value="1" id="r1" />
  <label htmlFor="r1">Option 1</label>
</RadioGroup>
```

---

## 31. Resizable (Panels)

**Import**

```ts
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
```

**Minimal usage**

```tsx
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>Left panel</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel>Right panel</ResizablePanel>
</ResizablePanelGroup>
```

---

## 32. Scroll Area

**Import**

```ts
import { ScrollArea } from "@/components/ui/scroll-area";
```

**Minimal usage**

```tsx
<ScrollArea className="h-48 w-48">
  <p>Lots of content here...</p>
</ScrollArea>
```

---

## 33. Select

**Import**

```ts
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
```

**Minimal usage**

```tsx
<Select>
  <SelectTrigger>Choose an option</SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

---

## 34. Separator

**Import**

```ts
import { Separator } from "@/components/ui/separator";
```

**Minimal usage**

```tsx
<Separator className="my-4" />
```

---

## 35. Sheet

**Import**

```ts
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
```

**Minimal usage**

```tsx
<Sheet>
  <SheetTrigger>Open Sheet</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>Sheet description</SheetDescription>
    </SheetHeader>
    <div>Sheet body</div>
  </SheetContent>
</Sheet>
```

---

## 36. Sidebar

**Import**

```ts
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  ...
} from "@/components/ui/sidebar"
```

**Minimal usage**

```tsx
<SidebarProvider defaultOpen>
  <Sidebar side="left" collapsible="icon">
    <SidebarTrigger />
    <SidebarContent>Menu items, etc.</SidebarContent>
  </Sidebar>
  <SidebarInset>Your main content here</SidebarInset>
</SidebarProvider>
```

---

## 37. Skeleton

**Import**

```ts
import { Skeleton } from "@/components/ui/skeleton";
```

**Minimal usage**

```tsx
<Skeleton className="h-4 w-32" />
```

---

## 38. Slider

**Import**

```ts
import { Slider } from "@/components/ui/slider";
```

**Minimal usage**

```tsx
<Slider defaultValue={[30]} max={100} step={1} onValueChange={(v) => ...} />
```

---

## 39. Sonner Toaster

**Import**

```ts
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
```

**Minimal usage**

```tsx
<>
  <Toaster />
  <Button onClick={() => toast("Hello!")}>Show Toast</Button>
</>
```

---

## 40. Switch

**Import**

```ts
import { Switch } from "@/components/ui/switch";
```

**Minimal usage**

```tsx
<Switch checked={enabled} onCheckedChange={(checked) => setEnabled(checked)} />
```

---

## 41. Table

**Import**

```ts
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
```

**Minimal usage**

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column A</TableHead>
      <TableHead>Column B</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>A1</TableCell>
      <TableCell>B1</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## 42. Tabs

**Import**

```ts
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
```

**Minimal usage**

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

---

## 43. Textarea

**Import**

```ts
import { Textarea } from "@/components/ui/textarea";
```

**Minimal usage**

```tsx
<Textarea placeholder="Multi-line text" />
```

---

## 44. ToggleGroup / Toggle

**Import**

```ts
import {
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"; // plus /toggle if needed
```

**Minimal usage**

```tsx
<ToggleGroup type="single" defaultValue="bold">
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
</ToggleGroup>;

// Or single Toggle:
import { Toggle } from "@/components/ui/toggle";
<Toggle pressed={isOn} onPressedChange={setOn}>
  Toggle me
</Toggle>;
```

---

## 45. Tooltip

**Import**

```ts
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
```

**Minimal usage**

```tsx
<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Tooltip text</TooltipContent>
</Tooltip>
```
