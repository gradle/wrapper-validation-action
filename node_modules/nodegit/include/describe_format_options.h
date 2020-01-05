// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITDESCRIBEFORMATOPTIONS_H
#define GITDESCRIBEFORMATOPTIONS_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>

#include "async_baton.h"
#include "callback_wrapper.h"
#include "reference_counter.h"
#include "nodegit_wrapper.h"

extern "C" {
  #include <git2.h>
 }

 
using namespace node;
using namespace v8;

class GitDescribeFormatOptions;

struct GitDescribeFormatOptionsTraits {
  typedef GitDescribeFormatOptions cppClass;
  typedef git_describe_format_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_describe_format_options **dest, git_describe_format_options *src) {
     Nan::ThrowError("duplicate called on GitDescribeFormatOptions which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_describe_format_options *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};
 class GitDescribeFormatOptions : public NodeGitWrapper<GitDescribeFormatOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitDescribeFormatOptionsTraits>;
  public:
    GitDescribeFormatOptions(git_describe_format_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

         
  private:
    GitDescribeFormatOptions();
    ~GitDescribeFormatOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetAbbreviatedSize);
        static NAN_SETTER(SetAbbreviatedSize);

   
        static NAN_GETTER(GetAlwaysUseLongFormat);
        static NAN_SETTER(SetAlwaysUseLongFormat);

   
        static NAN_GETTER(GetDirtySuffix);
        static NAN_SETTER(SetDirtySuffix);

  };

#endif
