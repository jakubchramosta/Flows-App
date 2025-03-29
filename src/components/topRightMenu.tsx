import AlgProgressRow from "./AlgProgressRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const TopRightMenu = () => {
  return (
    <div className="absolute right-5 top-5 flex flex-col gap-4">
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select algorithm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="test1">Test 1</SelectItem>
          <SelectItem value="test2">Test 2</SelectItem>
          <SelectItem value="test3">Test 3</SelectItem>
        </SelectContent>
      </Select>
      <div className="rounded-md border border-input bg-background p-2.5 px-3 shadow-sm">
        <h1>Maximum flow</h1>
        <p className="my-1 text-center font-bold">11</p>
      </div>
      <div className="rounded-md border border-input bg-background p-2.5 shadow-sm">
        <h1 className="pb-2">Algorithm progress</h1>
        <div className="flex flex-col gap-1">
          <AlgProgressRow />
          <AlgProgressRow />
          <AlgProgressRow />
        </div>
      </div>
    </div>
  );
};

export default TopRightMenu;
