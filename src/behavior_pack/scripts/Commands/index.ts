/**
 * Replica of Commands class that was in the Minecraft module.
 *  
 * @license MIT
 * @author JaylyMC
 * @project https://github.com/JaylyDev/GametestDB/tree/main/scripts/commands
 */
import { CommandResult, Dimension, Entity, world, Player } from "@minecraft/server";

/**
 * Main class for custom command functions, with the player that execute
 * this command with additional arguments split in an iterable iterator
 * string array.
 */
export class Command {
  private __player: Player;
  public argv: IterableIterator<string>;
  public get player(): Player { return this.__player; }
  public get argv0 (): string { return this.argv.next().value; };
  constructor (argv: string[], player: Player) {
    this.argv = (function* () { for (let arg of argv) yield arg; })();
    this.__player = player;
  };
};

/**
 * Contains a method that lets you run console commands within
 * Minecraft.
 */
// tslint:disable-next-line:no-unnecessary-class
export class Commands {
  /**
   * @remarks
   * Runs a particular command from the context.
   * @param commandString
   * Command to run. Note that command strings should not start
   * with slash.
   * @param target
   * Target to be used as context for the command to run
   * within.
   * @returns For commands that return data, returns a JSON structure with command response values.
   * @throws This function can throw errors.
   * @example commands.js
   * ```typescript
   *        Commands.run("say You got a new high score!");
   *        Commands.run("scoreboard players set @p score 10", world.getDimension("overworld"));
   * ```
   */
  static run(commandString: string, target: Dimension | Entity = world.getDimension("overworld")) {
    // @ts-ignore
    if (target instanceof Dimension || Entity) return target.runCommand(commandString);
    else throw TypeError("Native type conversion failed");
  };

  /**
   * @remarks
   * Runs a particular command asynchronously from the context.
   * Where possible - and especially for
   * long-running operations - you should use runCommandAsync
   * over runCommand.
   * @param commandString
   * Command to run. Note that command strings should not start
   * with slash.
   * @param target
   * Target to be used as context for the command to run
   * within.
   * @returns
   * For commands that return data, returns a CommandResult with
   * an indicator of command results.
   * @throws This function can throw errors.
   */
  static async runAsync(commandString: string, target: Dimension | Entity = world.getDimension("overworld")): Promise<CommandResult> {
    if (target instanceof Dimension || Entity) return target.runCommand(commandString);
    else throw TypeError("Native type conversion failed");
  };

  /**
   * @remarks
   * Registers a new custom command. This command will become
   * available in Minecraft via [prefix][command].
   * @param prefix
   * The prefix of this specific command. (Case sensitive)
   * @param command
   * Name of this specific command. (Case sensitive)
   * @param commandFunction
   * Implementation of the command function.
   * @throws
   * This function can throw error: You are not allow to register a new slash command.
   * @example example1.js
   * ```typescript
   *          Commands.register("!", "test", function (arg) {
   *              arg.player.runCommand(`say ${arg.argv0} ${JSON.stringify([...arg.argv])}`);
   *          });
   * ```
   */
  public static register (prefix: string, command: string, commandFunction: (arg: Command) => void): void {
    if (prefix.startsWith("/")) throw Error ("Unable to register slash commands.");
    world.beforeEvents.chatSend.subscribe((arg) => {
      var argv = arg.message.split(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g).filter( e => e.trim().length > 0);
      if (argv[0].toLowerCase() === `${prefix.toLowerCase()}${command.toLowerCase()}`) {
        arg.cancel = true;
        try {
          commandFunction(new Command(argv, arg.sender));
        } catch (err) {
          console.error(err);
          arg.sender.sendMessage(`§c${err}`);
        };
      };
    });
  };
};